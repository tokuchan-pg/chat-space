require 'rails_helper'

describe MessagesController do

    let(:group) { create(:group) }
    let(:message) { create(:message, group_id: group.id)}

    before do
      user = create(:user)
      login_user user
    end

    describe 'GET #index' do

      it "assigns the requested group to @group" do
        get :index, params:{ group_id: group.id }
        expect(assigns(:group)).to eq group
      end

      it "assigns the requested messages to @messages" do
        messages = create_list(:message, 3 , group_id: group.id)
        get :index, params:{ group_id: messages.first.group_id }
        expect(assigns(:messages)).to match messages
      end

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

      it "assigns the requested group to @group" do
        get :index, params:{ group_id: group.id }
        expect(assigns(:group)).to eq group
      end

      it "assigns the requested messages to @messages" do
        messages = create_list(:message, 3 , group_id: group.id)
        get :index, params:{ group_id: messages.first.group_id }
        expect(assigns(:messages)).to match messages
      end

      it "assigns the new message to @message with strong parameter" do
        post :create, params:{ group_id: group.id, message: attributes_for(:message)}
        expect(assigns(:message).body).to eq message.body
        expect(assigns(:message).image).to eq message.image
        expect(assigns(:message).group_id).to eq message.group_id
        expect(assigns(:message).user_id).to eq message.user_id
      end

      context 'if creating a message succeeded' do

        it "redirects to messages#index" do
          post :create, params:{ group_id: group.id, message: attributes_for(:message)}
          expect(response).to redirect_to group_messages_path
        end

      end

      context 'if creating a message failed' do

        it "renders to messages#index" do
          #bodyがブランクのparamsを渡すことで失敗時の状況を作る
          post :create, params:{ group_id: group.id, message: attributes_for(:message, body: "")}
          #リダイレクトではなくrenderなので、プレフィックスでテンプレートを指定することはできない
          expect(response).to render_template :index
        end

      end

    end

end
