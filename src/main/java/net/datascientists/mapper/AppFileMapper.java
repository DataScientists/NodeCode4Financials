package net.datascientists.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import net.datascientists.entity.AppFile;
import net.datascientists.mapper.base.BaseMapper;
import net.datascientists.vo.AppFileVO;

@Component
public class AppFileMapper implements BaseMapper<AppFileVO, AppFile>
{
	
	
	 @Override
	    public AppFileVO convertToVO(AppFile entity)
	    {
	        if (entity == null)
	        {
	            return null;
	        }

	        AppFileVO vo = new AppFileVO();
	        vo.setId(entity.getId());
	        vo.setFile_name(entity.getFile_name());
	        vo.setFile_path(entity.getFile_path());
	        vo.setCreated(entity.getCreated());
	        
	        return vo;
	    }
	 
    @Override
    public List<AppFileVO> convertToVOList(List<AppFile> entityList)
    {
        if (entityList == null)
        {
            return null;
        }
        List<AppFileVO> list = new ArrayList<>();
        for (AppFile entity : entityList)
        {
            list.add(convertToVO(entity));
        }
        return list;
    }


   


    @Override
    public AppFile convertToEntity(AppFileVO appFileVO)
    {
    	if(appFileVO == null){
			return null;
		}
		AppFile appFile = new AppFile();
		
		appFile.setId(appFileVO.getId());
		appFile.setFile_name(appFileVO.getFile_name());
		appFile.setFile_path(appFileVO.getFile_path());
		appFile.setCreated(appFileVO.getCreated());
		
        return appFile;
    }


    @Override
    public List<AppFile> convertToEntityList(List<AppFileVO> voList)
    {
    	 if (voList == null)
         {
             return null;
         }
         List<AppFile> list = new ArrayList<>();
         for (AppFileVO entity : voList)
         {
             list.add(convertToEntity(entity));
         }
         return list;
    }

}
