module GroupHelper
  def render_partial_template
    current_page?(action: :new)? '新規チャットグループ' : 'チャットグループ編集'
  end
end
