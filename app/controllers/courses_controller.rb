class CoursesController < ApplicationController
  def new
  	@course = Course.new
  end

  def create
    @course = Course.new(params[:course])
 
    if @course.save
      redirect_to :action => 'show', :id => @course.id
    else
       render :action => "new" 
    end
  end

  def edit
    @course = Course.find(params[:id])
  end

  def update
    @course = Course.find(params[:id])
    if @course.update_attributes(params[:course])
      flash[:success] = "Course updated"
      render 'edit'
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
  elsif params[:id]
    @courses = Course.find(params[:id])
  else
    @courses = Course.all
  end

  respond_to do |format|  
    format.html 
    format.json { render :json => @courses.to_json(:include => [:major, :period, :prerequisites]) }
    end
    
  end
end
