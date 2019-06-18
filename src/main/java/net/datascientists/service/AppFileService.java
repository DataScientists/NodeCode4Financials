package net.datascientists.service;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.BufferedOutputStream;  
import java.io.FileOutputStream;  
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import net.datascientists.dao.base.BaseDao;
import net.datascientists.entity.AppFile;
import net.datascientists.mapper.AppFileMapper;
import net.datascientists.service.base.FileBaseService;
import net.datascientists.utilities.CommonUtil;
import net.datascientists.vo.AppFileVO;


@Service("AppFileService")
@Transactional
public class AppFileService implements FileBaseService<AppFileVO>{

	@Value("${dir.uploader.File}")
	private String uploaderFilePath;
		
    @Autowired
    @Qualifier("AppFileDao")
    private BaseDao<AppFile> dao;
	
    @Autowired
	private AppFileMapper mapper;
    
    
    @Override
	public List<AppFileVO> list() {
		List<AppFileVO> retValue = new ArrayList<AppFileVO>();
        List <AppFile> Files = (List<AppFile>) dao.list();
		retValue = mapper.convertToVOList(Files);
		return retValue;
	}

	@Override
	public List<AppFileVO> find(String searchName, Object searchVal) {
		List<AppFile> Files =  dao.find(searchName,searchVal);
		List<AppFileVO> FileVOList = mapper.convertToVOList(Files);
		return FileVOList;
	}

	@Override
	public AppFileVO save(AppFileVO o) {
		AppFile FileEntity = (AppFile) dao.save(mapper.convertToEntity(o));
		return mapper.convertToVO(FileEntity);
	}

	@Override
	public void deleteSoft(AppFileVO vo) {
		dao.deleteSoft(mapper.convertToEntity(vo));
	}

    @Override
    public void deleteHard(AppFileVO vo)
    {
        dao.deleteHard(mapper.convertToEntity(vo));
    }

    @Override
    public List<AppFileVO> listDeleted()
    {
    	List<AppFileVO> retValue = new ArrayList<AppFileVO>();
        List <AppFile> AppFiles = (List<AppFile>) dao.listDeleted();
		retValue = mapper.convertToVOList(AppFiles);
		return retValue;
    }
    
	@Override
	public AppFileVO uploadFile(InputStream is, AppFileVO appFileVO)
			throws IOException {
		appFileVO.setFile_path(wrapPathSeparator(appFileVO.getFile_path()));
		dao.save(mapper.convertToEntity(appFileVO));
		processFileUpload(is, appFileVO.getFile_path(), appFileVO.getFile_name());
		return appFileVO;
	}
	
	
	@Override
	public InputStream downloadFile(AppFileVO appFileVO) throws IOException {
		File file = new File(uploaderFilePath+appFileVO.getFile_path()+appFileVO.getFile_name());
		if(!file.exists()){
			return null;
		}		
		InputStream targetStream = new FileInputStream(file);
		return targetStream;
	}
	private void processFileUpload(InputStream is, String fPath, String fName) throws IOException{
		File file = new File(uploaderFilePath+fPath+fName);
		if(!file.getParentFile().exists()){
			file.getParentFile().mkdirs();
		}
		FileUtils.copyInputStreamToFile(is, file);
	}

	private String wrapPathSeparator(String origPath){
		if(CommonUtil.isWindows()){
			return origPath.replace("/", "\\");
		}
		return origPath;
	}
	
}
