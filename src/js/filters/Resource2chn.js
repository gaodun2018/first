let resourceTypeList = [
  {
    "discriminator": "video",
    "label": "视频"
  },
  {
    "discriminator": "lecture_note",
    "label": "讲义"
  },
  {
    "discriminator": "paper",
    "label": "试卷"
  },
  {
    "discriminator": "question",
    "label": "题目"
  },
  {
    "discriminator": "live",
    "label": "直播"
  }
];

export const Resource2chn = function (v) {
  var chnresource = "";
  if(!v){return ''}
  for(var i = 0;i < resourceTypeList.length; i++){
    if(resourceTypeList[i].discriminator == v){
      chnresource = resourceTypeList[i].label;
    }
  }
  return chnresource;
};


