class TikisController < ApplicationController

  def bases
    @bases = Tiki.where(base: true)
    render partial: 'base_select'
  end

  def heads
    @heads = Tiki.where(base: false)
    render partial: 'head_select'
  end

end
