import ccxt
import pandas as pd
import time

# Configuration
exchange = ccxt.binance({
    'apiKey': 'YOUR_API_KEY',
    'secret': 'YOUR_API_SECRET',
    'enableRateLimit': True
})

symbol = 'BTC/USDT'
timeframe = '5m'  # Timeframe for candlesticks (e.g., '5m', '15m', '1h')
moving_average_short = 7
moving_average_long = 25
trade_amount = 0.001  # Amount of BTC to trade

def fetch_data():
    bars = exchange.fetch_ohlcv(symbol, timeframe, limit=moving_average_long + 1)
    df = pd.DataFrame(bars, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    return df

def apply_strategy(df):
    df['SMA_short'] = df['close'].rolling(moving_average_short).mean()
    df['SMA_long'] = df['close'].rolling(moving_average_long).mean()

    # Check for buy/sell signal
    if df['SMA_short'].iloc[-1] > df['SMA_long'].iloc[-1] and df['SMA_short'].iloc[-2] <= df['SMA_long'].iloc[-2]:
        return 'buy'
    elif df['SMA_short'].iloc[-1] < df['SMA_long'].iloc[-1] and df['SMA_short'].iloc[-2] >= df['SMA_long'].iloc[-2]:
        return 'sell'
    else:
        return 'hold'

def execute_trade(signal):
    if signal == 'buy':
        order = exchange.create_market_buy_order(symbol, trade_amount)
        print(f"Bought {trade_amount} BTC")
    elif signal == 'sell':
        order = exchange.create_market_sell_order(symbol, trade_amount)
        print(f"Sold {trade_amount} BTC")

def run_bot():
    while True:
        df = fetch_data()
        signal = apply_strategy(df)
        execute_trade(signal)
        print(f"Signal: {signal}")
        time.sleep(300)  # Sleep for 5 minutes

if __name__ == "__main__":
    run_bot()
