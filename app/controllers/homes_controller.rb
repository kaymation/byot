class HomesController < ApplicationController

  def index
    @tikis = Tiki.all
  end
end
