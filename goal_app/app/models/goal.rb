class Goal < ApplicationRecord
    validates :title, :details, :user_id, presence: true
    validates :completed, :private, inclusion: { in: [true, false] }

    belongs_to :user

    has_many :comments, as: :commentable
end
