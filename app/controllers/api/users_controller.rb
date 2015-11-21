class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render "api/user/show"
    else
      render json: {}
    end

  end

  def index
    @users = User.all
    render json: @users.as_json(only: [:id, :username])
  end

  def show

    @user = User.find_by(username: params[:id])
    @posts = @user.posts
    render :show
  end

  def update
    @user = current_user
    if @user.update_attribute(:user_pic, params[:user][:user_pic])
      render json: @user
    end

  end

  private
  def user_params
    self.params.require(:user).permit(:username, :password, :body)
  end

end
