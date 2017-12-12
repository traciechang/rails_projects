require 'rails_helper'

describe User do
  subject(:user) do
    FactoryGirl.create(
      :user,
      email: "sansa@winterfell.com",
      password: "sansa",
      cheer_count: 1
    )
  end

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_uniqueness_of(:email) }

  describe "::find_by_credentials" do
    before { user.save! }

    it "finds user when the correct credentials are given" do
      expect(User.find_by_credentials("sansa@winterfell.com", "sansa")).to eq(user)
    end

    it "returns nil when the wrong credentials are given" do
      expect(User.find_by_credentials("sansa@sansa.com", "sansa")).to eq(nil)
    end
  end
end
