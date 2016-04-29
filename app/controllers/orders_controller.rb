class OrdersController < ApplicationController
  def new
    render partial: 'form'
  end

  def create
    @order = Order.new(user: current_user,
     zip: params[:address][:zip],
     street_address: params[:address][:street])
    #  binding.pry
    if @order.save
      params[:pole].each_with_index do |part, pos|
        tiki = Tiki.find_by(object_path: part)
        OrderTiki.create(order: @order, tiki: tiki, position: pos)
      end
      render json: { success: true, email: current_user.email, count: current_user.pole_count }
    else
      throw Exception
    end
  end

  def index
    if current_user.try(:admin)
      @orders = Order.all
      render partial: 'index'
    else
      render partial: 'unauthorized'
    end
  end


  def fill
    @order = Order.find(params[:order][:id])
    if @order.update(filled: true)
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  def destroy
    @order = Order.find(params[:id])
    if @order.delete
      render json: {success: true}
    else
      render json: {success: false}
    end
  end


end
