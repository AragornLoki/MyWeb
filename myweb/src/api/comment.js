import service from "@/tools/request"

export function sendComment(Data) {
  return service.request({
    url: '/user/comment',
    method: 'post',
    data: {
      comment: Data
    }
  })
};

export function getComment() {
  return service.request({
    url: '/user/getComment',
    method: 'post',
    data: {}
  })
};
