import service from "@/tools/request"


export function verifyPas(Data) {
  return service.request({
    url: '/pas',
    method: 'post',
    data: {
      password: Data
    }
  })
};