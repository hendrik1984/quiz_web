class Admin::QuestionsController < ApplicationController
    before_action :set_question, only: [:edit, :update, :destroy]

    def index
        @questions = Question.includes(:category).order(created_at: :desc)
    end

    def new
        @question = Question.new
        4.times { @question.options.build }
    end

    def create
        @question = Question.new(question_params)

        if @question.save
            redirect_to admin_questions_path, notice: "Question created successfully"
        else
            render :new
        end
    end

    def edit
        (4 - @question.options.size).times { @question.options.build }
    end

    def update
        if @question.update(question_params)
            redirect_to admin_questions_path, notice: "Question updated successfully"
        else
            render :edit
        end
    end

    def destroy
        @question.destroy
        redirect_to admin_questions_path, notice: "Question deleted"
    end

    private

    def set_question
        @question = Question.find(params[:id])
    end

    def question_params
        params.require(:question).permit(
            :category_id,
            :content,
            :image,
            :question_type,
            :difficulty,
            :explanation,
            :active,
            options_attributes: [
                :id,
                :content,
                :image,
                :correct,
                :position,
                :_destroy
        ]
        )
    end
end