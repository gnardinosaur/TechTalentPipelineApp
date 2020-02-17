class Api::V1::StocksController < ApplicationController
  
  def fetch 
    # get stock data from IEX API
    @url = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=V,AXP,NKE,AAPL,IBM&types=quote&filter=latestPrice,previousClose&token=#{ENV['IEX_API_SANDBOX']}"
    @response = RestClient.get(@url)
    @data = JSON.parse(@response)
    render json: @data 
  end

end
