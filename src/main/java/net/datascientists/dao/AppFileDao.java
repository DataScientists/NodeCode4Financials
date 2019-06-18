package net.datascientists.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import net.datascientists.dao.base.BaseDao;
import net.datascientists.entity.AppFile;

@Repository("AppFileDao")
public class AppFileDao implements BaseDao<AppFile> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public AppFile save(AppFile AppFile) {
		final Session session = sessionFactory.getCurrentSession();
		AppFile.setDeleted(0);
		session.saveOrUpdate(AppFile);
		return AppFile;
	}	
	
	@SuppressWarnings("unchecked")
    @Override
    public List<AppFile> find(String searchName, Object searchVal)
    {
        final Session session = sessionFactory.getCurrentSession();
        final Criteria crit = session.createCriteria(AppFile.class);
        crit.add(Restrictions.eq(searchName, searchVal));
        return crit.list();
    }	
		
	
	@Override
	@SuppressWarnings("unchecked")
	public List<AppFile> list(){
		final Session session = sessionFactory.getCurrentSession();
		final Criteria crit = session.createCriteria(AppFile.class);
		crit.add(Restrictions.eq("deleted", 0));
		return crit.list();
	}	
	@Override
	@SuppressWarnings("unchecked")
   	public List<AppFile> listDeleted() {
    	final Session session = sessionFactory.getCurrentSession();
        final Criteria crit = session.createCriteria(AppFile.class);
        crit.add(Restrictions.eq("deleted", 1));
        return crit.list();
    }
    @Override
    public void deleteSoft(AppFile AppFile){
        sessionFactory.getCurrentSession().saveOrUpdate(AppFile);
        
    }
    @Override
    public void deleteHard(AppFile AppFile){
    	sessionFactory.getCurrentSession().delete(AppFile);
        
    }
}
