import { Request, Response } from "express";

import { db } from "../database/mysql";

export async function getDaebangPic(req: Request, res: Response) {
  const { cnt } = req.query;
  const SELECT_DAE_BANG_PIC = `
  SELECT 
  	g.* 
	FROM (
		SELECT
			f.idx 
			, f.name
			, f.photo
      		, nickname
			, COUNT(f.idx) AS cnt
		FROM 
			tjc_family_table f 
			LEFT OUTER JOIN tjc_present_table p
			ON f.idx = p.familyidx
		WHERE  
			f.registchurch = 6
			AND p.churchidx = 6
			AND f.status != 6
			AND f.photo != ''
		GROUP BY f.idx ) g
		WHERE cnt > ?
		ORDER BY cnt DESC
	`;
  return db.execute(SELECT_DAE_BANG_PIC, [cnt || 0]).then((res) => res[0]);
}

export async function getMemberData(req: Request) {
  const { churchidx } = req.query;
  const SELECT_MEMBER = `
	SELECT 
		name
		, small_group
		, sex
		, nickname
		, photo
	FROM 
		tjc_family_table 
	WHERE 
		churchidx = ? 
		AND status != 6
	ORDER BY small_group
	`;
  return db.execute(SELECT_MEMBER, [churchidx || 6]).then((res) => res[0]);
}

export async function recentWorshipData(req: Request, res: Response) {
  const SELECT_RECENT_WORSHIP = `
	SELECT 
		idx
		, title 
	FROM 
		tjc_worship_table 
	WHERE 
		date > DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY) 
		AND date < DATE_ADD(CURRENT_DATE(), INTERVAL 6 day)  
		AND title NOT LIKE '%오후%'
	ORDER BY date DESC
	`;
  return db.execute(SELECT_RECENT_WORSHIP).then((res) => res[0]);
}
