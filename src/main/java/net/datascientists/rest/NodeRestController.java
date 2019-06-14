package net.datascientists.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;

import net.datascientists.rest.base.BaseRestController;
import net.datascientists.service.base.BaseService;
import net.datascientists.vo.NodeVO;

@Path("/node")
public class NodeRestController implements BaseRestController<NodeVO>{

	@Autowired
	@Qualifier("NodeService")
	private BaseService<NodeVO> service;

	@GET
	@Path(value="/list")
	@Produces(value=MediaType.APPLICATION_JSON_VALUE)
	@Override
	public Response list() {
		List<NodeVO> list = new ArrayList<NodeVO>();
		try{
			list = (List<NodeVO>) service.list();
		}catch(Throwable e){
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).type("text/plain").entity(e.getMessage()).build();
		}
		return Response.ok(list).build();
	}
	
	@GET
	@Path(value="/getNodeTree")
	@Produces(value=MediaType.APPLICATION_JSON_VALUE)
	@Override
	public Response findById(@QueryParam("id") Long id) {
		List<NodeVO> list = new ArrayList<NodeVO>();
		try{
			list = service.find("id",id);
		}catch(Throwable e){
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).type("text/plain").entity(e.getMessage()).build();
		}
		return Response.ok(list).build();
	}

	@Path(value="/save")
	@POST
    @Consumes(value=MediaType.APPLICATION_JSON_VALUE)
    @Produces(value=MediaType.APPLICATION_JSON_VALUE)
	@Override
	public Response save(NodeVO json) {
		try{
			service.save(json);
		}catch(Throwable e){
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).type("text/plain").entity(e.getMessage()).build();
		}
		return Response.ok().build();
	}

	@Path(value="/deleteSoft")
	@POST
	@Override
	public Response deleteSoft(NodeVO json) {
		try{
			service.deleteSoft(json);
		}catch(Throwable e){
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).type("text/plain").entity(e.getMessage()).build();
		}
		return Response.ok().build();
	}

    @Override
    public Response listDeleted()
    {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Response deleteHard(NodeVO json)
    {
        // TODO Auto-generated method stub
        return null;
    }


}
