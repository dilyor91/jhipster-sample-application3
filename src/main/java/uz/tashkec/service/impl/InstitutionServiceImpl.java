package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.Institution;
import uz.tashkec.repository.InstitutionRepository;
import uz.tashkec.service.InstitutionService;
import uz.tashkec.service.dto.InstitutionDTO;
import uz.tashkec.service.mapper.InstitutionMapper;

/**
 * Service Implementation for managing {@link Institution}.
 */
@Service
@Transactional
public class InstitutionServiceImpl implements InstitutionService {

    private final Logger log = LoggerFactory.getLogger(InstitutionServiceImpl.class);

    private final InstitutionRepository institutionRepository;

    private final InstitutionMapper institutionMapper;

    public InstitutionServiceImpl(InstitutionRepository institutionRepository, InstitutionMapper institutionMapper) {
        this.institutionRepository = institutionRepository;
        this.institutionMapper = institutionMapper;
    }

    @Override
    public InstitutionDTO save(InstitutionDTO institutionDTO) {
        log.debug("Request to save Institution : {}", institutionDTO);
        Institution institution = institutionMapper.toEntity(institutionDTO);
        institution = institutionRepository.save(institution);
        return institutionMapper.toDto(institution);
    }

    @Override
    public InstitutionDTO update(InstitutionDTO institutionDTO) {
        log.debug("Request to update Institution : {}", institutionDTO);
        Institution institution = institutionMapper.toEntity(institutionDTO);
        institution = institutionRepository.save(institution);
        return institutionMapper.toDto(institution);
    }

    @Override
    public Optional<InstitutionDTO> partialUpdate(InstitutionDTO institutionDTO) {
        log.debug("Request to partially update Institution : {}", institutionDTO);

        return institutionRepository
            .findById(institutionDTO.getId())
            .map(existingInstitution -> {
                institutionMapper.partialUpdate(existingInstitution, institutionDTO);

                return existingInstitution;
            })
            .map(institutionRepository::save)
            .map(institutionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InstitutionDTO> findAll() {
        log.debug("Request to get all Institutions");
        return institutionRepository.findAll().stream().map(institutionMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InstitutionDTO> findOne(Long id) {
        log.debug("Request to get Institution : {}", id);
        return institutionRepository.findById(id).map(institutionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Institution : {}", id);
        institutionRepository.deleteById(id);
    }
}
