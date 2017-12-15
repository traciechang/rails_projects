class Comment < ApplicationRecord
    validates :body, :post, :user, presence: true

    after_initialize :ensure_post_id!

    belongs_to(
        :user,
        class_name: "User",
        foreign_key: :user_id,
        inverse_of: :comments
    )

    belongs_to :post, inverse_of: :comments

    belongs_to(
        :parent_comment,
        class_name: "Comment",
        foreign_key: :parent_comment_id,
        primary_key: :id,
        optional: true
    )

    has_many(
        :child_comments,
        class_name: "Comment",
        foreign_key: :parent_comment_id,
        primary_key: :id
    )

    private
    def ensure_post_id!
        self.post_id ||= self.parent_comment.post_id if parent_comment
    end
end
