package net.datascientists.vo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonIgnoreProperties(ignoreUnknown = true)
public  class NodeVO {

	protected long idNode;
	protected long anchorId;
	protected String name;
	protected String description;
	protected String type;
	protected int sequence = 1;
	protected String number;
	protected String parentId;
	protected long link;
	protected long topNodeId;
	protected Date lastUpdated;
	@JsonInclude(Include.NON_EMPTY)
	protected List<NoteVO> notes;
	private List<NodeVO> childNodes;
	protected long originalId;
	protected Integer deleted = 0;
	protected String nodeclass;
	
	private String inputValue;	
	private String calculatedValue;	
	private String region;	
	private String period;	
	private Date asOfDate;	

	
	public long getIdNode() {
		return idNode;
	}

	public void setIdNode(long idNode) {
		this.idNode = idNode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getSequence() {
		return sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public long getLink() {
		return link;
	}

	public void setLink(long link) {
		this.link = link;
	}

	public long getTopNodeId() {
		return topNodeId;
	}

	public void setTopNodeId(long topNodeId) {
		this.topNodeId = topNodeId;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public List<NoteVO> getNotes() {
		return notes;
	}

	public void setNotes(List<NoteVO> notes) {
		this.notes = notes;
	}

	public long getOriginalId() {
		return originalId;
	}

	public void setOriginalId(long originalId) {
		this.originalId = originalId;
	}

	public Integer getDeleted() {
		return deleted;
	}

	public void setDeleted(Integer deleted) {
		this.deleted = deleted;
	}

	public String getNodeclass() {
		nodeclass = "";
		if(this.getType()!=null){
			if(this.getType().length()>0){
				nodeclass = this.getType().substring(0,1);
			}
		}
		
		return nodeclass;
	}

	public void setNodeclass(String nodeclass) {
		this.nodeclass = nodeclass;
	}

	public long getAnchorId() {
		if(anchorId==0){
			anchorId = idNode;
		}
		return anchorId;
	}

	public void setAnchorId(long anchorId) {
		this.anchorId = anchorId;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public List<NodeVO> getChildNodes() {
		return childNodes;
	}

	public void setChildNodes(List<NodeVO> childNodes) {
		this.childNodes = childNodes;
	}

	public String getInputValue() {
		return inputValue;
	}

	public void setInputValue(String inputValue) {
		this.inputValue = inputValue;
	}

	public String getCalculatedValue() {
		return calculatedValue;
	}

	public void setCalculatedValue(String calculatedValue) {
		this.calculatedValue = calculatedValue;
	}

	public Date getAsOfDate() {
		return asOfDate;
	}

	public void setAsOfDate(Date asOfDate) {
		this.asOfDate = asOfDate;
	}

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

}
