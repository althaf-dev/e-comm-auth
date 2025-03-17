const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_ID,
  secretAccessKey: process.env.S3_ACCESS_SEC,
  region: process.env.AWS_REGION,
});

const s3FileUpload = async (file, folder = 'profile-pics/') => {
  if (!file) return;

  const fileName = `${folder} ${Date.now()}_${file.originalname}`;
  const upload = await s3
    .upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();
  return upload.Location;
};

module.exports = s3FileUpload;
