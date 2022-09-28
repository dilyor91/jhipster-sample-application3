package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.CenterStructure;

/**
 * Spring Data JPA repository for the CenterStructure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CenterStructureRepository extends JpaRepository<CenterStructure, Long> {}
