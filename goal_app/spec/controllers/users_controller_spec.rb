require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    subject(:user) do
        User.create!(
            email: "arya@winterfell.com",
            password: "arya",
            cheer_count: 1
        )
    end
    
    describe 'GET #index' do
        it "renders the index page" do
            get :index
            expect(response).to render_template('index')
            expect(response).to have_http_status(200)
        end
    end

    describe "GET #show" do
        it "renders the individual account page" do
            get :show, params: { id: user.id }
            expect(response).to render_template("show")
        end
    end

    describe "POST #create" do
        context "with invalid params" do
            it "validates that user entered email and password" do
                post :create, params: { user: { email: "sansa@winterfell.com" } }
                expect(flash.now[:errors]).to be_present
            end
        end

        context "with valid params" do
            it "redirects user to individual account page when account successfully created" do
                post :create, params: { user: { email: "arya@winterfell.com", password: "arya", cheer_count: 0 } }
                expect(response).to redirect_to(User.find_by_credentials("arya@winterfell.com", "arya"))
            end
        end
    end
end
