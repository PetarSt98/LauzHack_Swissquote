import random
import threading
from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_socketio import join_room
import pandas as pd
import openai
import requests
from bs4 import BeautifulSoup
import datetime
import time
import keyboard


app = Flask(__name__)
socketio = SocketIO(app)
base_url = ['https://www.bloomberg.com/europe', 'https://www.swissquote.com/', 'https://finance.yahoo.com/']
companies = ['bloomberg', 'swissquote', 'finance.yahoo']
days_back = 7
openai_api_key = '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'
market_scenario = 'Crypto Winter'


def generate_financial_news(companies, days_back, openai_api_key, _market_scenario=None):
    # Calculate the date X days back
    date_limit = datetime.datetime.now() - datetime.timedelta(days=days_back)
    date_limit_str = date_limit.strftime('%Y-%m-%d')

    # Placeholder for news articles
    articles = []

    # Prepare the prompt for each company
    for company in companies:
        prompt = (
            f"Generate a headline and a financial news article published by {company}, covering the past {days_back} days (since {date_limit_str}). "
            f"{'Current market status: ' + _market_scenario + '. ' if _market_scenario is not None else ''}"
            f"{'Generate very turbulent news. ' if 0.33 < random.random() else ''}"
            "First, write the headline, then below it, write the article."
        )
        openai.api_key = openai_api_key

        # Generate news using OpenAI's GPT-3.5-turbo
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=300,  # Increased to accommodate both headline and article
            temperature=1,
            frequency_penalty=0.8,
            presence_penalty=0.8
        )

        # Extract the generated text
        generated_text = response.get('choices', [{}])[0].get('text', '').strip()

        # Splitting the generated text into headline and article
        split_text = generated_text.split('\n', 1)  # Split at the first newline character
        headline = split_text[0].strip()
        article = split_text[1].strip() if len(split_text) > 1 else ""

        articles.append({'date': date_limit_str, 'company': company, 'headline': headline, 'article': article})

    return articles


def fetch_financial_news(base_urls, days_back):
    # Calculate the date X days back
    date_limit = datetime.datetime.now() - datetime.timedelta(days=days_back)

    # Placeholder for news articles
    articles = []

    # Fetch the news from the URL (you might need to adjust this part based on the actual website's structure)
    for _base_url in base_urls:
        response = requests.get(_base_url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Assuming each news article is in an HTML element with class 'news-item'
        for item in soup.find_all(class_='news-item'):
            date_str = item.find(class_='date-class').text  # Adjust class as per the website's HTML structure
            news_date = datetime.datetime.strptime(date_str, '%Y-%m-%d')  # Adjust date format as necessary

            # Only add news if it's within the desired timeframe
            if news_date >= date_limit:
                title = item.find(class_='title-class').text  # Adjust class as per the website's HTML structure
                link = item.find('a')['href']  # Adjust tag/attribute as necessary
                articles.append({'date': news_date, 'title': title, 'link': link})

    return articles


def summarize_news(articles, openai_api_key):
    # Join the titles of the articles for summarization
    news_text = '\n'.join([article['company'] for article in articles])

    # Initialize OpenAI GPT
    openai.api_key = openai_api_key

    # Generate summary
    response = openai.Completion.create(
        engine="text-davinci-003",  # Or the latest GPT model
        prompt="Summarize very detail the following financial news:\n\n" + news_text,
        max_tokens=500,
        temperature=0
    )

    return response.choices[0].text


def analyze_investment_behavior(file_path, openai_api_key):
    # Read the Excel file
    # Read the CSV file, excluding the 'DATE_TRANSACTION' column
    data = pd.read_csv(file_path).drop(columns=['DATE_TRANSACTION'])

    # Convert ACTION to a factor: 1 for 'Buy' and -1 for 'Sell'
    data['ACTION_FACTOR'] = data['ACTION'].apply(lambda x: 1 if x == 'Buy' else -1)

    # Calculate the net quantity
    data['NET_QTY'] = data['QTY'] * data['ACTION_FACTOR']

    # Analyze the dataset
    action_type_counts = data['ACTION_TYPE'].value_counts(normalize=True) * 100
    buy_sell_counts = data['ACTION'].value_counts(normalize=True) * 100
    product_type_counts = data['PRODUCT_TYPE'].value_counts(normalize=True) * 100
    average_unit_price = data['UNIT_PRICE'].mean()
    currency_distribution = data['CURRENCY'].value_counts(normalize=True) * 100
    total_amount_stats = data['TOTAL_AMOUNT'].describe()
    top_stocks = data['STOCK_LIBELLE'].value_counts().head(5)  # Top 5 stocks
    average_action_qty = data['NET_QTY'].mean()
    average_rate_eur = data['RATE_EUR'].mean()
    average_rate_usd = data['RATE_USD'].mean()



    # Constructing the prompt
    prompt = f'''Analyze the investment profile of a customer based on the following data:\n 
        1. action_type_counts: {action_type_counts}\n
        2. buy_sell_counts: {buy_sell_counts}\n
        3. product_type_counts: {product_type_counts}\n
        4. average_unit_price: {average_unit_price}\n
        5. currency_distribution: {currency_distribution}\n
        6. total_amount_stats: {total_amount_stats}\n
        7. top_stocks: {top_stocks}\n
        8. average_action_qty: {average_action_qty}\n
        9. average_rate_eur: {average_rate_eur}\n
        10. average_rate_usd: {average_rate_usd}\n
        Provide a detailed description of the customers investment behavior,
        highlighting their preferences, risk profile, and potential investment strategies.'''

    # Initialize OpenAI GPT-4
    openai.api_key = openai_api_key

    # Make the API call
    response = openai.Completion.create(
        engine="text-davinci-003",  # Specify GPT-4 or its advanced version here
        prompt=prompt,
        max_tokens=350,
        temperature=0
    )

    return response.choices[0].text


def generate_advice(_name, _summary, _description, _strategy, openai_api_key, _market_scenario=None):

    # Initialize OpenAI GPT
    openai.api_key = openai_api_key

    # Generate summary
    response = openai.Completion.create(
        engine="text-davinci-003",  # Or the latest GPT model
        prompt=f'''
                Customer Investment Profile Description: {_description}\n
                Summary of Latest Financial News: {_summary}\n
                Investment strategy that customer prefers: {_strategy}\n
                {f"Important Market Scenario: {_market_scenario}!" if _market_scenario is not None else ""}
                \nTask: Based on the customer's investment profile and recent financial news, generate tailored investment suggestions. Focus on suggesting general investment areas and strategies that align with the customer's profile. The response should:
                    - Be directly addressed to the customer.
                    - Highlight the importance of timing, market dynamics and current market scenario.
                    - Pay attention to the Customer Investment Profile Description and give advice based on that.
                    - Discuss risk management strategies and how they apply to the suggested investments.
                    - Avoid mentioning specific company names or exact financial figures.
                    - Be clear, concise, and informative, helping the customer make well-informed decisions.
                    - Name of customer: {_name}.
                    - Add at the end Best regards, \n Swissquote.
                ''',
        max_tokens=500,
        temperature=0.4,
        frequency_penalty=0.7,
        presence_penalty=0.7
    )

    return response.choices[0].text


def is_advice_important(advice, _market_scenario=None):
    # Define keywords or phrases that indicate importance
    important_keywords = ['significant drop', 'major gain', 'big loss', 'urgent', 'critical', 'high risk', 'crash']

    # Check if any important keywords are in the advice or summary
    for keyword in important_keywords:
        if keyword in advice.lower():
            return True
        # Construct the API request for analyzing the text
    prompt = f"Analyze this financial advice for importance:\nAdvice: {advice}\n{'Pay attention to the current market scenario: ' + _market_scenario if _market_scenario is not None else ''}\nIs this advice important for immediate action, is something urgent happening or are there excellent opportunity to buy? Answer with Yes or No."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=50,
        temperature=0,
        api_key=openai_api_key
    )

    # Interpret the response
    analysis = response.choices[0].text.strip().lower()

    return 'yes' in analysis


def keywords_extract(_articles, openai_api_key):
    for article in _articles:
        prompt = f"Tag the following article with one or more keywords from this list: energy, materials, industrials, utilities, healthcare, financials, crypto, discretionary, staples, tech, communication, society:\n {article['article']}. Please do not include anything else besides the keywords in the response."
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=50,
            temperature=0,
            api_key=openai_api_key
        )
        article['keywords'] = response.choices[0].text
    return _articles


def invoke_advice_creation(user_id):
    strategy = None
    name = None
    file_path = None

    df = pd.read_csv('Database.csv', index_col=0)  # Assuming first column is the index

    # Check if user_id exists in the DataFrame
    if user_id in df.index:
        # Update strategy
        strategy = df.loc[user_id, 'strategy']
        name = df.loc[user_id, 'name']
        file_path = df.loc[user_id, 'dataset']

    # articles = fetch_financial_news(base_url, days_back)
    articles = generate_financial_news(companies, days_back, openai_api_key, market_scenario)

    summary = summarize_news(articles, openai_api_key)

    description = analyze_investment_behavior(file_path, openai_api_key)
    # print(description)

    result = generate_advice(name, summary, description, strategy, openai_api_key, market_scenario)

    return articles, result


def notification(user_id):
    while True:
        articles, result = invoke_advice_creation(user_id)

        if is_advice_important(result, market_scenario):
            print(result)
        else:
            print('...')

        start_time = time.time()
        while time.time() - start_time < 3600:
            if keyboard.is_pressed('space'):
                print("Skipping wait...")
                break
            if keyboard.is_pressed('s'):
                print(result)
                socketio.emit('advice', {'user_id': user_id, 'result': result}, room=str(user_id))
                break
            time.sleep(0.05)  # check every second


@socketio.on('join')
def on_join(room):
    join_room(room)


def notification_wrapper():
    df = pd.read_csv('Database.csv', index_col=0)  # Assuming first column is the index
    for user_id in df.index:
        user_thread = threading.Thread(target=notification, args=(user_id,))
        user_thread.start()


@app.route('/getAdvice', methods=['GET'])
def get_advice():
    user_id = request.args.get('user_id')  # Retrieve user_id from query parameter
    if user_id is None:
        return jsonify({"error": "Missing user_id parameter"}), 400  # Bad Request for missing user_id

    articles, result = invoke_advice_creation(user_id)
    return jsonify({"articles": articles, "advice": result})


@app.route('/news', methods=['GET'])
def get_news():
    articles = generate_financial_news(companies, days_back, openai_api_key, market_scenario)
    articles = keywords_extract(articles, openai_api_key)
    return jsonify({"articles": articles})


@app.route('/setStrategy', methods=['POST'])
def set_strategy():
    data = request.json  # Get data from POST request
    user_id = data.get('user_id')
    strategy = data.get('strategy')

    # Load the DataFrame
    df = pd.read_csv('Database.csv', index_col=0)  # Assuming first column is the index

    # Check if user_id exists in the DataFrame
    if user_id in df.index:
        # Update strategy
        df.loc[user_id, 'strategy'] = strategy
        # Save changes back to CSV
        df.to_csv('database.csv')
        return jsonify({'status': 'success', 'message': 'Strategy updated'}), 200
    else:
        # User ID not found
        return jsonify({'status': 'error', 'message': 'User ID not found'}), 404


if __name__ == '__main__':
    notification_thread = threading.Thread(target=notification_wrapper)
    notification_thread.start()

    app.run(debug=False)


