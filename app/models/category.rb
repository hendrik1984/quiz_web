class Category < ApplicationRecord
    has_many :questions, dependent: :destroy

    validates :name, presence: true, uniqueness: true
    validates :slug, presence: true, uniqueness: true
end
