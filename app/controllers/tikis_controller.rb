class TikisController < ApplicationController

  def bases
    @bases = Tiki.where(base: true)
    render partial: 'base_select'
  end

  def heads
    @heads = Tiki.where(base: false)
    render partial: 'head_select'
  end

  def edithead
    @heads = Tiki.where(base: false)
    @index = params[:index]
    render partial: 'head_swap_select'
  end

  def fill

  end

  def destroy
    
  end

end
