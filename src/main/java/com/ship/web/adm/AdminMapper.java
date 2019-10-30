package com.ship.web.adm;

import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
	public Admin selectByAdminIdPw(Admin param);
	public void select(Admin param);
	public void update(Admin param);
	public void delete(Admin param);
}
