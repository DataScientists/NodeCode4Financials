package net.datascientists.rest;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import net.datascientists.service.base.FileBaseService;
import net.datascientists.vo.AppFileVO;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;

@Path("/appFiles")
public class AppFileRestController {

	@Autowired
	@Qualifier("AppFileService")
	private FileBaseService<AppFileVO> service;
	

	
    @POST
	@Path(value = "/upload")
	@Consumes({javax.ws.rs.core.MediaType.MULTIPART_FORM_DATA, MediaType.APPLICATION_JSON_VALUE})
	@Produces(value = MediaType.APPLICATION_JSON_VALUE)
	public Response uploadAppImage(@FormDataParam("file") InputStream fileInputString, 
			@FormDataParam("file") FormDataContentDisposition fileInputDetails,
			@FormDataParam("filePath") String filePath) {
    	
    	AppFileVO fileVO = new AppFileVO();
				
    	fileVO.setFile_name(fileInputDetails.getFileName());
    	fileVO.setFile_path(filePath);
		
		try {
		
			AppFileVO vo =service.uploadFile(fileInputString, fileVO);
			return Response.ok(vo).build();
		} catch (Throwable e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).type("text/plain").entity(e.getMessage()).build();
		}
	}
    @GET
	@Path(value="/list")
	@Produces(value=MediaType.APPLICATION_JSON_VALUE)
	public Response list() {
		List<AppFileVO> list = new ArrayList<AppFileVO>();
		try{
			list = (List<AppFileVO>) service.list();
		}catch(Throwable e){
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).type("text/plain").entity(e.getMessage()).build();
		}
		return Response.ok(list).build();
	}
    @POST
	@Path(value = "/downloadFile")
	@Consumes(value = MediaType.APPLICATION_JSON_VALUE)
	@Produces(value = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Response downloadFile(AppFileVO vo) {
		try {
			InputStream fileData = service.downloadFile(vo);
			return Response.ok(fileData)
					.header("Content-Disposition", "attachment; filename=\"" + vo.getFile_name()+ "\"" )
					.build();
		} catch (Throwable e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).type("text/plain").entity(e.getMessage()).build();
		}
	}
}
