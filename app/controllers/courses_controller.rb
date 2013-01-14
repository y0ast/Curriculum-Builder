class CoursesController < ApplicationController
  def new
  	@course = Course.new
  end

  def edit
    @course = Course.find(params[:id])
  end

  def update
    @course = Course.find(params[:id])
    if @course.update_attributes(params[:course])
      flash[:success] = "Course updated"
    else
      render 'edit'
    end
  end

  def show
    @course = Course.find(params[:id])
  end

  def index
   if params[:term]
    @courses = Course.search(params[:term]).limit(10)
  else
    @courses = Course.all
  end

  respond_to do |format|  
    format.html 
    format.json { render :json => @courses.to_json(:include => [:major, :period]) }
    end
    
  end
end
