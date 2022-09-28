package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.Institution;

/**
 * Spring Data JPA repository for the Institution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {}
