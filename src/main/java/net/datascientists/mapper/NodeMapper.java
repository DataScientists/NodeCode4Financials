package net.datascientists.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import net.datascientists.entity.Node;
import net.datascientists.mapper.base.BaseMapper;
import net.datascientists.vo.NodeVO;

@Component
public class NodeMapper implements BaseMapper<NodeVO,Node>{
 
    @Override
    public NodeVO convertToVO(Node node) {
        if (node == null) {
            return null;
        }
        NodeVO nodeVO = new NodeVO();
        nodeVO.setName(node.getName());
        nodeVO.setDescription(node.getDescription());
        nodeVO.setIdNode(node.getId());
        nodeVO.setDeleted(node.getDeleted());
        nodeVO.setLastUpdated(node.getLastUpdated());
        nodeVO.setType(node.getType());
        nodeVO.setInputValue(node.getInputValue());
        nodeVO.setCalculatedValue(node.getCalculatedValue());
        nodeVO.setAsOfDate(node.getAsOfDate()); 
        nodeVO.setRegion(node.getRegion()); 
        nodeVO.setPeriod(node.getPeriod()); 
        List<Node> childNodes = node.getChildNodes();
        if (!childNodes.isEmpty()) {
        	nodeVO.setChildNodes(this.convertToVOList(childNodes));
        }		
        return nodeVO;
    }
    
    @Override
	public Node convertToEntity(NodeVO nodeVO) {
		if(nodeVO == null){
			return null;
		}
		Node node = new Node();
		node.setId(nodeVO.getIdNode()); 
		node.setDeleted(nodeVO.getDeleted());
        node.setLastUpdated(nodeVO.getLastUpdated());
        
		return node;
	}	
    
    @Override
	public List<Node> convertToEntityList(List<NodeVO> nodeVOs) {
		if (nodeVOs == null) {
            return null;
        }
        List<Node> list = new ArrayList<Node>();
        for (NodeVO node : nodeVOs) {       	
        	list.add(convertToEntity(node));       	
        }
        return list;
	}	
    
    @Override
	public List<NodeVO> convertToVOList(List<Node> entityList) {
		if (entityList == null) {
            return null;
        }
        List<NodeVO> list = new ArrayList<NodeVO>();
        for (Node entity : entityList) {
            list.add((NodeVO)convertToVO(entity));
        }
        return list;
	}		
}
