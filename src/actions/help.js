
export function implode(glue, pieces) {
  return ((pieces instanceof Array) ? pieces.join(glue) : pieces);
}

export function changeVkId(params, uid) {

  params = params.substr(1);
  params = params.split('&');
  params.map((value, index) => {
    if (value.split('=')[0] == 'vk_user_id') params[index] = 'vk_user_id=' + uid;
  });
  return '?' + implode('&', params);
}