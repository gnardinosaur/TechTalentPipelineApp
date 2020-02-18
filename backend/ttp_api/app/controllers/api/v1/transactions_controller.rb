class Api::V1::TransactionsController < ApplicationController

  def index 
    @transactions = Transaction.all
    render json: @transactions
  end

  def create 
    byebug
    # @transaction = Transaction.create(ticker: params[:ticker], num_share: params[:num_shares], price: params[:price])
    # render json: @transaction
  end

end