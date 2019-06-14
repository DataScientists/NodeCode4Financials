package net.datascientists.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.datascientists.dao.base.BaseDao;
import net.datascientists.entity.Node;
import net.datascientists.mapper.NodeMapper;
import net.datascientists.service.base.BaseService;
import net.datascientists.vo.NodeVO;


@Service("NodeService")
@Transactional
public class NodeService implements BaseService<NodeVO>{

	@Autowired
	@Qualifier("NodeDao")
	private BaseDao<Node> dao;
	
	@Autowired
	private NodeMapper mapper;

	@Override
	public List<NodeVO> list() {
		List<NodeVO> retValue = new ArrayList<NodeVO>();
        List <Node> nodes = (List<Node>) dao.list();
		retValue = mapper.convertToVOList(nodes);
		return retValue;
	}

	@Override
	public List<NodeVO> find(String searchName, Object searchVal) {
		List<Node> nodes = dao.find(searchName,searchVal);
		List<NodeVO> nodeVOs = mapper.convertToVOList(nodes);
		List<NodeVO> list = new ArrayList<NodeVO>();
		list.addAll(nodeVOs);
		return list;
	}

	@Override
	public NodeVO save(NodeVO o) {
		Node nodeEntity = (Node) dao.save(mapper.convertToEntity(o));
		return mapper.convertToVO(nodeEntity);
	}

	@Override
	public void deleteSoft(NodeVO vo) {
		dao.deleteSoft(mapper.convertToEntity(vo));
	}

    @Override
    public void deleteHard(NodeVO vo)
    {
        dao.deleteHard(mapper.convertToEntity(vo));
    }

    @Override
    public List<NodeVO> listDeleted()
    {
    	List<NodeVO> retValue = new ArrayList<NodeVO>();
        List <Node> nodes = (List<Node>) dao.listDeleted();
		retValue = mapper.convertToVOList(nodes);
		return retValue;
    }   
}
