require 'rails_helper'

describe MessagesController do

    let(:group) { create(:group) }
    let(:message) { create(:message, group_id: group.id)}

    before do
      user = create(:user)
      login_user user
    end

    describe 'GET #index' do

      it "assigns the new message to @message" do
        get :index, params:{ group_id: group.id }
        #ActualがMessageクラスのインスタンスであるかどうかをテスト
        expect(assigns(:message)).to be_an_instance_of Message
      end

      it "renders the :index template" do
        get :index, params:{ group_id: group.id }
        expect(response).to render_template :index
      end

    end

    describe 'POST #create' do

      it "assigns the new message to @message with strong parameter" do
        post :create, params:{ group_id: group.id, message: attributes_for(:message)}
        expect(assigns(:message).body).to eq message.body
        expect(assigns(:message).image).to eq message.image
        expect(assigns(:message).group_id).to eq message.group_id
        expect(assigns(:message).user_id).to eq message.user_id
      end

      it "redirects to messages#index" do
        post :create, params:{ group_id: group.id, message: attributes_for(:message)}
        expect(response).to redirect_to group_messages_path
      end

    end

end
