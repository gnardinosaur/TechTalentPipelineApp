class Api::V1::StocksController < ApplicationController
  
  def fetch 
    # get stock data from IEX API, restriced to five (5) for speed -- using previousClose in place of open b/c open is a paid feature of IEX
    @url = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=V,AXP,NKE,AAPL,IBM&types=quote&filter=latestPrice,previousClose&token=#{ENV['IEX_API_SANDBOX']}"
    @response = RestClient.get(@url)
    @data = JSON.parse(@response)
    
    # create cleaner hash from API response hash
    @stock_hash = {}
    @data.each do |ticker, quote| 
      @stock_hash[ticker] = {
        'lastPrice' => quote['quote']['latestPrice'],
        'prevClose' => quote['quote']['previousClose']
      }
    end 
    
    render json: @stock_hash
  end

end
