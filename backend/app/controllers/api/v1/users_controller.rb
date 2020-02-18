class Api::V1::UsersController < ApplicationController

  def index 
    @users = User.all
    render json: @users
  end

  def create 
    @user = User.create(user_params)
    if @user.valid?
      @user.cash = 5000
      @user.save
      render json: { user: UserSerializer.new(@user), status: 'OK' }
    else 
      render json: { status: 'ERROR', messages: @user.errors.full_messages }
    end 
  end

  def sign_in
    if User.find_by(email: user_params[:email])
      @user = User.find_by(email: user_params[:email])
      if @user.password === user_params[:password]
        render json: { user: UserSerializer.new(@user), status: 'OK' }
      else 
        render json: { status: 'ERROR', message: 'Email and Password do not match - please try again.' }
      end
    else 
      render json: { status: 'ERROR', message: 'Not a valid Email - please try again.' }
    end 
  end

  def update
    @user = User.find(params[:id])
    @user.update(cash: params[:user][:cash])
  end 

  def user_transactions
    @user = User.find(params[:id])
    @transactions = @user.transactions
    render json: @transactions
  end 

  private 

  def user_params 
    params.require(:user).permit(:name, :email, :password, :cash)
  end

end