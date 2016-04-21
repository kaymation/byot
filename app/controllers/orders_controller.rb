class OrdersController < ApplicationController
  def new
    render partial: 'form'
  end

  def create
    @order = Order.new(user: current_user,
     zip: params[:address][:zip],
     street_address: params[:address][:street_address])
    if @order.save
      params[:pole].each_with_index do |part, pos|
        tiki = Tiki.find_by(object_path: part)
        OrderTiki.create(order: @order, tiki: tiki, position: pos)
      end
      render json: { success: true }
    else
      throw Exception
    end
  end

end
