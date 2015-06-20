class UsersController < ApplicationController
  
  skip_before_filter :verify_authenticity_token

  def index
  	@users = User.all
  	render json: @users
  end

  def create
  	@user = User.create(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], password: params[:password])
  	render json:@users
  end
end
