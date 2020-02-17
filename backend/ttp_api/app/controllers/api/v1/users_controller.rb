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
      render json: { status: 'ERROR', message: @user.errors.full_messages }
    end 
  end

  private 

  def user_params 
    params.require(:user).permit(:name, :email, :password, :cash)
  end

end