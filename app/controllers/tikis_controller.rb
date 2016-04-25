class TikisController < ApplicationController

  def bases
    @bases = Tiki.where(base: true)
    render partial: 'base_select'
  end

  def heads
    @heads = Tiki.where(base: false)
    render partial: 'head_select'
  end

  def edit_head
    @heads = Tiki.where(bases: false)
    render partial: 'head_swap_select'
  end

end
