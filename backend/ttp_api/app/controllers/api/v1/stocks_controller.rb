class Api::V1::StocksController < ApplicationController
  
  def fetch 
    # get stock data from IEX API, restriced to five (5) for speed
    @url = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=V,AXP,NKE,AAPL,IBM&types=quote&filter=latestPrice&token=#{ENV['IEX_API_SANDBOX']}"
    @response = RestClient.get(@url)
    @data = JSON.parse(@response)
    
    # create cleaner hash from API response hash
    @stock_hash = {}
    @data.each do |ticker, quote| 
      @stock_hash[ticker] = quote['quote']['latestPrice']
    end 
    
    render json: @stock_hash
  end

end
