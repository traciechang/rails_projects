class Post < ApplicationRecord
    validates :title, :author, presence: true
    validates :subs, presence: { message: "must have at least one sub" }

    has_many :post_subs, inverse_of: :post, dependent: :destroy
    has_many :subs, through: :post_subs, source: :sub
    has_many :comments, inverse_of: :post
    
    belongs_to(
        :author,
        class_name: "User",
        foreign_key: :user_id,
        primary_key: :id,
        inverse_of: :posts
    )

    def comments_by_parent_id
        comments_by_parent_id = Hash.new { |hash, key| hash[key] = [] }
        self.comments.includes(:user).each do |comment|
            comments_by_parent_id[comment.parent_comment_id] << comment
        end

        comments_by_parent_id
    end
end
