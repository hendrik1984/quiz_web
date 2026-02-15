class PagesController < ApplicationController
  def home
    @categories = Category.includes(:questions).order(created_at: :desc).page(params[:page]).per(6)
  end

  def search
    
  end
end
