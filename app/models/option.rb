class Option < ApplicationRecord
  belongs_to :question
  has_one_attached :image

  validates :content, presence: true, unless: -> { image.attached? }
end
