package com.len.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.GetObjectRequest;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.ObjectMetadata;
import com.len.entity.OSSConfigure;


/**
 * 对OSS服务器进行上传删除等的处理
 * 
 * @ClassName: OSSManageUtil
 * @Description:
 * @author liux
 * @date 2017-5-3 上午10:47:00
 * 
 */
public class OSSManageUtil {
	/**
	 * 上传OSS服务器文件 @Title: uploadFile
	 * 
	 * @param multipartFile
	 *            spring 上传的文件 remotePath @param oss服务器二级目录
	 * @throws Exception
	 *             设定文件 @return String 返回类型 @throws
	 */
	public static String uploadFile(InputStream fileContent, String remotePath, String fileName) throws Exception {
	
		// 加载配置文件，初始化OSSClient
		OSSConfigure ossConfigure = new OSSConfigure("properties/ossService.properties");
		System.out.println(ossConfigure.getAccessKeyId());
		OSSClient ossClient = new OSSClient(ossConfigure.getEndpoint(), ossConfigure.getAccessKeyId(),
				ossConfigure.getAccessKeySecret());
		// 定义二级目录
		String remoteFilePath = remotePath.substring(0, remotePath.length()).replaceAll("\\\\", "/") + "/";
		// 创建上传Object的Metadata
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(fileContent.available());
		objectMetadata.setContentEncoding("utf-8");
		objectMetadata.setCacheControl("no-cache");
		objectMetadata.setHeader("Pragma", "no-cache");
		objectMetadata.setContentType(contentType(fileName.substring(fileName.lastIndexOf("."))));
		objectMetadata.setContentDisposition("inline;filename=" + fileName);
		// 上传文件
		ossClient.putObject(ossConfigure.getBucketName(), remoteFilePath + fileName, fileContent, objectMetadata);
		// 关闭OSSClient
		ossClient.shutdown();
		// 关闭io流
		fileContent.close();
		return ossConfigure.getAccessUrl() + "/" + remoteFilePath + fileName;
	}

	// 下载文件
	@SuppressWarnings("unused")
	public static void downloadFile(OSSConfigure ossConfigure, String key, String filename)
			throws OSSException, ClientException, IOException {
		// 初始化OSSClient
		OSSClient ossClient = new OSSClient(ossConfigure.getEndpoint(), ossConfigure.getAccessKeyId(),
				ossConfigure.getAccessKeySecret());
		OSSObject object = ossClient.getObject(ossConfigure.getBucketName(), key);
		// 获取ObjectMeta
		ObjectMetadata meta = object.getObjectMetadata();

		// 获取Object的输入流
		InputStream objectContent = object.getObjectContent();

		ObjectMetadata objectData = ossClient.getObject(new GetObjectRequest(ossConfigure.getBucketName(), key),
				new File(filename));
		// 关闭数据流
		objectContent.close();

	}

	/**
	 * 根据key删除OSS服务器上的文件 @Title: deleteFile @Description: @param @param
	 * ossConfigure @param @param filePath 设定文件 @return void 返回类型 @throws
	 * 
	 * @throws IOException
	 */
	public static void deleteFile(String filePath) throws IOException {
		// 加载配置文件，初始化OSSClient
		OSSConfigure ossConfigure = new OSSConfigure("ossService.properties");
		OSSClient ossClient = new OSSClient(ossConfigure.getEndpoint(), ossConfigure.getAccessKeyId(),
				ossConfigure.getAccessKeySecret());
		ossClient.deleteObject(ossConfigure.getBucketName(), filePath);

	}

	/**
	 * Description: 判断OSS服务文件上传时文件的contentType @Version1.0
	 * 
	 * @param FilenameExtension
	 *            文件后缀
	 * @return String
	 */
	public static String contentType(String FilenameExtension) {
		if (FilenameExtension.equals(".BMP") || FilenameExtension.equals(".bmp")) {
			return "image/bmp";
		}
		if (FilenameExtension.equals(".GIF") || FilenameExtension.equals(".gif")) {
			return "image/gif";
		}

		if (FilenameExtension.equals(".HTML") || FilenameExtension.equals(".html")) {
			return "text/html";
		}
		if (FilenameExtension.equals(".TXT") || FilenameExtension.equals(".txt")) {
			return "text/plain";
		}
		if (FilenameExtension.equals(".VSD") || FilenameExtension.equals(".vsd")) {
			return "application/vnd.visio";
		}
		if (FilenameExtension.equals(".PPTX") || FilenameExtension.equals(".pptx") || FilenameExtension.equals(".PPT")
				|| FilenameExtension.equals(".ppt")) {
			return "application/vnd.ms-powerpoint";
		}
		if (FilenameExtension.equals(".DOCX") || FilenameExtension.equals(".docx") || FilenameExtension.equals(".DOC")
				|| FilenameExtension.equals(".doc")) {
			return "application/msword";
		}
		if (FilenameExtension.equals(".XML") || FilenameExtension.equals(".xml")) {
			return "text/xml";
		}
		if (FilenameExtension.equals(".apk") || FilenameExtension.equals(".APK")) {
			return "application/octet-stream";
		}
		// 视频格式：

		if (FilenameExtension.equalsIgnoreCase(".AVI")) {
			return "video/avi";
		}
		if (FilenameExtension.equalsIgnoreCase(".rmvb")) {
			return "application/vnd.rn-realmedia-vbr";
		}
		if (FilenameExtension.equalsIgnoreCase(".wmv")) {
			return "video/x-ms-wmv";
		}
		if (FilenameExtension.equalsIgnoreCase(".mp4")) {
			return "video/mpeg4";
		}
		if (FilenameExtension.equalsIgnoreCase(".mpg")) {
			return "video/mpg";
		}

		// 图片格式
		if (FilenameExtension.equals(".JPEG") || FilenameExtension.equals(".jpeg") || FilenameExtension.equals(".JPG")
				|| FilenameExtension.equals(".jpg") || FilenameExtension.equals(".PNG")
				|| FilenameExtension.equals(".png")) {
			return "image/jpeg";
		}

		return "text/html";
	}

	 public static String getUrl(String key) {
		  key = key.replaceAll("\\\\", "/");
		 
		// 加载配置文件，初始化OSSClient
			OSSConfigure ossConfigure = null;
			try {
				ossConfigure = new OSSConfigure("properties/ossService.properties");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println(ossConfigure.getAccessKeyId());
			OSSClient ossClient = new OSSClient(ossConfigure.getEndpoint(), ossConfigure.getAccessKeyId(),
					ossConfigure.getAccessKeySecret());
		    // 设置URL过期时间为10年  3600l* 1000*24*365*10
		    Date expiration = new Date(new Date().getTime() + 3600l * 1000 * 24 * 365 * 10);
		    // 生成URL
		    URL url = ossClient.generatePresignedUrl(ossConfigure.getBucketName(), key, expiration);
		    if (url != null) {
		      return url.toString();
		    }
		    return null;
		  }
	public static void main(String[] args) throws Exception {
//		InputStream is = new FileInputStream(new File("C:\\Users\\xuguoqiang\\Desktop\\测试\\视频测试\\test.mpg"));
//		String apkUrl = OSSManageUtil.uploadFile(is, "xxapp", "test.mpg");
//		System.out.println(apkUrl);
//		System.out.println(apkUrl.length());
//
//		// xxapp/lxkc_1529888467822.txt
//		// OSSManageUtil.deleteFile("xxapp/lxkc_1529656390601.txt");
//		OSSConfigure config = new OSSConfigure("ossService.properties");
//		OSSManageUtil.downloadFile(config, "xxapp/lxkc_1529888467822.txt", "d:/a.txt");
	//	,unlawful\20180813\1234121534148297933_视频截图.png,unlawful\20180813\1234121534148298025_视频截图.png,unlawful\20180813\1234121534148298139_视频截图.png
		String url = OSSManageUtil.getUrl("unlawful\20180813\1234121534148297752_视频截图.png");
		System.out.println(url);
         
	}
}
