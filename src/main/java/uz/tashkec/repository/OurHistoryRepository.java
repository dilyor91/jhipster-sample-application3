package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.OurHistory;

/**
 * Spring Data JPA repository for the OurHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OurHistoryRepository extends JpaRepository<OurHistory, Long> {}
