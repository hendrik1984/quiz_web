class Question < ApplicationRecord
  belongs_to :category
  has_many :options, dependent: :destroy
  has_one_attached :image

  QUESTION_TYPES = %w[single_choice multiple_choice true_false text]

  validates :question_type, inclusion: { in: QUESTION_TYPES }
  validates :content, presence: true, unless: -> { image.attached? }
  validate :must_have_options_for_choice_questions

  accepts_nested_attributes_for :options, allow_destroy: true

  def must_have_options_for_choice_questions
    if %w[single_choice multiple_choice].include?(question_type)
      errors.add(:options, "must be present") if options.reject(&:marked_for_destruction?).empty?
    end
  end
end