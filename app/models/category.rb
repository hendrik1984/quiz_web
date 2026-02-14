class Category < ApplicationRecord
    has_many :questions, dependent: :destroy

    validates :name, presence: true, uniqueness: true, length: {minimum: 3, maximum: 40}
    validates :slug, presence: true, uniqueness: true, length: {minimum: 3, maximum: 60}
end
