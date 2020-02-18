class Api::V1::TransactionsController < ApplicationController

  def index 
    @transactions = Transaction.all
    render json: @transactions
  end

  def create 
    @transaction = Transaction.create(ticker: params[:stock][:ticker], num_shares: params[:stock][:qty], price: params[:price], user_id: params[:user_id])
    render json: @transaction
  end

end